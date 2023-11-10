package tnew.manager.project.common.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.common.security.EmployeeInfo;

@Service
@RequiredArgsConstructor
public class LoginSuccessHandler implements AuthenticationSuccessHandler {
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
	    EmployeeInfo employeeInfo = (EmployeeInfo) authentication.getPrincipal();
	    String name = employeeInfo.getName();
	    String division = employeeInfo.getDivision();
	    String employeeId = employeeInfo.getEmployeeId();
	    
	    // 클라이언트에게 반환할 응답 생성
    	String jsonResponse = "{ \"returnCode\": \"OK_AUTHORIZE\", \"name\": \"" + name + "\", \"division\": \"" + division + "\", \"employeeId\": \"" + employeeId + "\" }";
	    response.setCharacterEncoding("UTF-8"); // UTF-8 인코딩 설정
	    response.setStatus(HttpServletResponse.SC_OK);
	    response.setContentType("application/json");
	    response.getWriter().write(jsonResponse);
	}
}
