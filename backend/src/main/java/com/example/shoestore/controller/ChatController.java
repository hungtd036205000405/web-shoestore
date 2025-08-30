package com.example.shoestore.controller;

import com.example.shoestore.dto.request.ChatRequest;
import com.example.shoestore.dto.response.ApiResponse;
import com.example.shoestore.dto.response.ChatResponse;
import com.example.shoestore.service.AiChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final AiChatService aiChatService;

    @PostMapping
    public ApiResponse<ChatResponse> chat(@RequestBody ChatRequest request) {
        ChatResponse response = aiChatService.chat(request);
        return ApiResponse.success(response);
    }
}
