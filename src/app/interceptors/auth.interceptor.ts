import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userService } from '../service/users.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: userService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Danh sách các URL không cần thêm header Authorization
    const noAuthUrls = [
      'https://remarkably-arriving-imp.ngrok-free.app/football/matches',
      'football-data.org' // Nếu bạn gọi trực tiếp API football-data.org
    ];

    // Kiểm tra xem URL yêu cầu có nằm trong danh sách không cần token không
    const isNoAuthUrl = noAuthUrls.some(url => req.url.includes(url));

    if (isNoAuthUrl) {
      // Không thêm header Authorization cho các URL này
      return next.handle(req);
    }

    // Thêm header Authorization cho các yêu cầu khác
    const token = this.userService.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}