package tnew.manager.project.login.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import tnew.manager.project.employee.dto.EmployeeFormDTO;
import tnew.manager.project.login.LoginService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/tripManager")
@Tag(name = "로그인 API",description = "로그인 서비스")
public class LoginController {
	
	private final LoginService service;
	
	@Operation(summary = "로그인 진행" , description = "로그인 서비스")
	@PostMapping(value = "/login")
	public ResponseEntity<?>login(@RequestBody EmployeeFormDTO employeeInfo)throws Exception{
		
		try {
			service.login(employeeInfo);
			return ResponseEntity.ok("OK");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
		
	}
	
}
