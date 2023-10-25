package tnew.manager.project.join.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import tnew.manager.project.employee.dto.EmployeeFormDTO;
import tnew.manager.project.employee.entity.Employee;
import tnew.manager.project.join.service.JoinService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/tripManager")
@Tag(name = "회원가입 API",description = "회원가입 서비스")
public class JoinController {
	
	private final JoinService service;
	
	private final PasswordEncoder passwordEncoder;
	
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
	
	@Operation(summary = "회원가입", description = "신규사원 회원가입 서비스")
	@PostMapping(value = "/employeeJoin")
	public ResponseEntity<?> employeeJoin(@RequestBody EmployeeFormDTO dto)throws Exception{
		
		String employeeId = service.getEmployeeId();//자동으로 사번 불러오기
		String password = passwordEncoder.encode(dto.getPassword());//패스워드 암호화		
		
		//dto에 저장
		dto.setEmployeeId(employeeId);
		dto.setPassword(password);
		
		Employee employee = Employee.joinInfo(dto);
		
		try {
			service.employeeJoin(employee, passwordEncoder);
			return ResponseEntity.ok("회원가입 성공");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
		
	}
	
}
