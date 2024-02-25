import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ChatserviceService } from './service/chatservice.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'socket_insert_in_DB_chatApp';
  form!:FormGroup;

  messageList: string[] = [];

  
  constructor(private chatService: ChatserviceService,
    private formb : FormBuilder,
){

}
initForm(){  
  this.form = this.formb.group({    
    msg: [''],
  })
}

  ngOnInit(){
    this.initForm();
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.form.value.msg);
    this.form.reset();
  }

}
