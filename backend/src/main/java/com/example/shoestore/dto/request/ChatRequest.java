package com.example.shoestore.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRequest {
    private Long conversationId; // null nếu là cuộc trò chuyện mới
    private Long userId;
    private String message;
}
