import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../shared/service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,) { }

  ngOnInit() {
    //toggle sidebar
    $("#toggle-sidebar").click(function () {
      $(".page-wrapper").toggleClass("toggled");
    });



    // Pin sidebar on click
    $("#pin-sidebar").click(function () {
      if ($(".page-wrapper").hasClass("pinned")) {
        // unpin sidebar when hovered
        $(".page-wrapper").removeClass("pinned");
        $("#sidebar").unbind("hover");
      } else {
        $(".page-wrapper").addClass("pinned");
        $("#sidebar").hover(
          function () {
            console.log("mouseenter");
            $(".page-wrapper").addClass("sidebar-hovered");
          },
          function () {
            console.log("mouseout");
            $(".page-wrapper").removeClass("sidebar-hovered");
          }
        )
      }
    });



    // Pinned sidebar
    $(function () {
      $(".page-wrapper").hasClass("pinned");
      $("#sidebar").hover(
        function () {
          console.log("mouseenter");
          $(".page-wrapper").addClass("sidebar-hovered");
        },
        function () {
          console.log("mouseout");
          $(".page-wrapper").removeClass("sidebar-hovered");
        }
      )
    });

  }
  onLogout() {
    this.authService.onLogout();
  }
}
