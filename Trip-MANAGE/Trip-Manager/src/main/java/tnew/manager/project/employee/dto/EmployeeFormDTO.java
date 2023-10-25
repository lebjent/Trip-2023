package tnew.manager.project.employee.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EmployeeFormDTO {
	
	@Schema(description = "사번(자동배정)")
	private String employeeId;
	
	@Schema(description = "비밀번호")
	private String password;
	
	@Schema(description = "이름")
	private String name;
	
	@Schema(description = "성별")
	private String gender;
	
	@Schema(description = "생년월일")
	private String birthDay;
	
	@Schema(description = "휴대폰번호")
	private String phone;
	
	@Schema(description = "이메일")
	private String email;
	
	@Schema(description = "담당부서")
	private String division;
	
	@Schema(description = "가입 허가 여부")
	private String confirm;
	
	
}
