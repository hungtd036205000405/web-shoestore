package com.example.shoestore.service;

import com.example.shoestore.dto.request.ChatRequest;
import com.example.shoestore.dto.response.ChatResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiChatService {
    private final WebClient.Builder webClientBuilder;

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    public ChatResponse chat(ChatRequest request) {
        // gọi OpenAI API
        Map<String, Object> response = webClientBuilder.build()
                .post()
                .uri(apiUrl)
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(Map.of(
                        "model", "gpt-4o-mini",
                        "messages", new Object[]{
                                Map.of("role", "user", "content", request.getMessage())
                        },
                        "max_tokens", 200
                ))
                .retrieve()
                .bodyToMono(Map.class)
                .doOnError(err -> {
                    System.err.println("OpenAI API error: " + err.getMessage());
                })
                .block();

        // lấy kết quả trả lời
        String reply = ((Map<String, Object>) ((Map<String, Object>)
                ((java.util.List<Object>) response.get("choices")).get(0))
                .get("message"))
                .get("content").toString();

        return new ChatResponse(
                request.getConversationId(),
                reply
        );
    }
}
