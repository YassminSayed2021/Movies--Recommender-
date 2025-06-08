import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ai-chat',
  imports: [FormsModule,CommonModule],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css'
})
export class AiChatComponent {
  userMessage = '';
  messages: { sender: 'user' | 'bot'; text: string }[] = [];
  isOpen = false;

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    const message = this.userMessage;
    this.messages.push({ sender: 'user', text: message });
    this.userMessage = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.ApiKey}` 
    });

      const body = {
      model: 'command-r-plus',
      prompt: message,
      max_tokens: 200,
      temperature: 0.7
    };

    this.http.post('https://api.cohere.ai/v1/generate', body, { headers }).subscribe({
      next: (res: any) => {
        const reply = res.generations[0]?.text?.trim() || 'No response';
        this.messages.push({ sender: 'bot', text: reply });
      },
      error: (err) => {
        console.error('Error calling Cohere:', err);
        this.messages.push({ sender: 'bot', text: 'Something went wrong. Please try again later.' });
      }
    });
  }
}

