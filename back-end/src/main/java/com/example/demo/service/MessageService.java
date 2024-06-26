package com.example.demo.service;

import com.example.demo.dto.MessageDTO;
import com.example.demo.entity.MessageEntity;
import com.example.demo.entity.PostEntity;
import com.example.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserService userService;

    public List<MessageDTO> getAllMessages(String userName) {
        List<MessageEntity> messageEntities = messageRepository.findAll();
        int length = messageEntities.size();
        List<MessageDTO> messages = new ArrayList<>(length);
        for (MessageEntity messageEntity : messageEntities) {
            String messageSender = messageEntity.getSender();
            String messageReceiver = messageEntity.getReceiver();
            if (messageSender == userName || messageReceiver == userName) {
                MessageDTO messageDTO = new MessageDTO();
                messageDTO.setId(messageEntity.getId());
                messageDTO.setSender(messageSender);
                messageDTO.setReceiver(messageReceiver);

                String senderProfile = userService.getProfilePhoto(messageSender);
                String receiverProfile = userService.getProfilePhoto(messageReceiver);
                messageDTO.setReceiverProfilePic(receiverProfile);
                messageDTO.setSenderProfilePic(senderProfile);
                messages.add(messageDTO);
            }

        }
        return messages;
    }

    public void saveMessage(MessageEntity messageEntity) {
        messageRepository.save(messageEntity);
    }

    public void deleteMessage(int messageId) {
        messageRepository.deleteById(messageId);
    }
}
