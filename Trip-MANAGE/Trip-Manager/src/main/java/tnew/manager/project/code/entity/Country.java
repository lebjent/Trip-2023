package tnew.manager.project.code.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "country_tbl")//테이블명
public class Country {
	
	@Id
	@Column(name = "code")//컬럼명
	private String code; //국가코드
	
	@Column(nullable = false, length=200)
	private String name; //국가명
	
}
