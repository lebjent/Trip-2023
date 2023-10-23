package tnew.manager.project.join.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import tnew.manager.project.join.service.JoinService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/tripManager")
@Tag(name = "회원가입 API",description = "회원가입 서비스")
public class JoinController {
	
	private final JoinService service;
	
	@Operation(summary = "사원번호 생성", description = "신규 사원번호를 가져오는 서비스")
	@PostMapping(value = "/getEmployeeId")
	public ResponseEntity<?> getEmployeeId()throws Exception{
		
		try {
			String employeeId = service.getEmployeeId();
			return ResponseEntity.ok(employeeId);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
		
	}
	
}
