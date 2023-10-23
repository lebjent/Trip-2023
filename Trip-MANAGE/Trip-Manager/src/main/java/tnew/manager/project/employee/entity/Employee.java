package tnew.manager.project.employee.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import tnew.manager.project.common.entity.BaseEntity;

@Getter
@Setter
@ToString
@Entity
@Table(name = "employee_tbl")//테이블명
public class Employee extends BaseEntity{
	
	@Id
	@Column(name = "employee_id")//컬럼명
	private String employeeId; //게시물 번호
	
	@Column(nullable = false, length=50)
	private String password; //비밀번호
	
	@Column(nullable = false, length=5)
	private String name; //이름
	
	@Column(nullable = false, length=3)
	private String gender; //성별
	
	@Column(nullable = false, length=13)
	private String phone; //전화번호
	
	@Column(nullable = false, length=25)
	private String email; //이메일
	
	@Column(nullable = false, length=10)
	private String division; //담당부서
	
	@Column(nullable = false, length = 3, columnDefinition = "CHAR(3) DEFAULT 'N'")
	private String confirm; //컴펌여부
	
}
