package tnew.manager.project.common.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginSuccessHandler implements AuthenticationSuccessHandler {
	
	
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        
        // 클라이언트에게 반환할 응답 생성
        String jsonResponse = "{ \"returnCode\": \"OK_AUTHORIZE\" }";
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json"); // JSON 응답을 전달한다는 컨텐츠 타입 설정
        response.getWriter().write(jsonResponse);
	}
	
}
