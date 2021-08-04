import { Component, OnInit } from '@angular/core';
import {User, UserService} from "../../service/user/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User | null = null;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getInfo()
      .then(user => {
        this.user = user;
        console.log('user', user);
      });
  }

}
