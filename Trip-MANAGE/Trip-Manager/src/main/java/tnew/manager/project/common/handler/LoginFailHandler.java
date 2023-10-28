package tnew.manager.project.common.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpRequest;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Service;

@Service
public class LoginFailHandler extends SimpleUrlAuthenticationFailureHandler {
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest req, HttpServletResponse res, AuthenticationException exception) throws IOException, ServletException {
	    String returnCode = exception.getMessage(); // 예외 메시지
	    String jsonResponse = "{ \"returnCode\": \"" + returnCode + "\" }"; // JSON 응답을 생성

	    res.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // HTTP 상태 코드 설정
	    res.setContentType("application/json"); // JSON 응답을 전달한다는 컨텐츠 타입 설정
	    res.getWriter().write(jsonResponse); // JSON 응답을 클라이언트로 보냄
	}
	
}
