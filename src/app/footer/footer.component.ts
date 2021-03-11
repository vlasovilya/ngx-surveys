import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer mb-4 mt-2">
      Demo using Angular {{ version }}
      <br />
      Released under the
      <a href="https://github.com/vlasovilya/ngx-surveys/blob/master/LICENSE">MIT</a> license.
      <a href="https://github.com/vlasovilya/ngx-surveys">View source</a>.
    </footer>
  `,
  styles: [
    `
      .footer {
        line-height: 2;
        text-align: center;
        font-size: 12px;
        color: #999;
      }
    `,
  ],
})
export class FooterComponent implements OnInit {
  version = VERSION.full;

  constructor() {}

  ngOnInit() {}
}
