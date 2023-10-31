package tnew.manager.project.common.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Service;

@Service
public class LogOutHandler implements LogoutSuccessHandler{

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		
		String jsonResponse = "{ \"returnCode\": \"OK_LOGOUT\", \"message\": \"로그아웃이 성공적으로 완료되었습니다.\" }";
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        // 보안 헤더 설정
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");
        // CORS 허용 헤더 설정
        response.setHeader("Access-Control-Allow-Origin", "*");
        // 로그 남기기
        response.getWriter().write(jsonResponse);
	}

}
