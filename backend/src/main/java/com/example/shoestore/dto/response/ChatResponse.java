package com.example.shoestore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatResponse {
    private Long conversationId;
    private String reply;
}
