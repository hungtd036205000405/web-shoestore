package com.example.shoestore.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${openai.api.key}")
    private String apiKey;

    @Bean
    public WebClient.Builder webClientBuilder() {
        // In ra key để kiểm tra Spring đã load chưa
        System.out.println(">>> Loaded OpenAI API key: " + apiKey);
        return WebClient.builder();
    }
}
