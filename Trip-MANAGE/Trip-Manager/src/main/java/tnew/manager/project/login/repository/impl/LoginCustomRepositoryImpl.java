package tnew.manager.project.login.repository.impl;

import javax.persistence.EntityManager;

import com.querydsl.jpa.impl.JPAQueryFactory;

import tnew.manager.project.employee.entity.QEmployee;
import tnew.manager.project.login.repository.LoginCustomRepository;

public class LoginCustomRepositoryImpl implements LoginCustomRepository {
	
	//동적으로 쿼리를 생성하기 위하여 JPAQueryFactory를 생성
	private JPAQueryFactory queryFactory;
	
	public LoginCustomRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}
	
	@Override
	public String loginPermissionConfirm(String employeeId) throws Exception {
		
		QEmployee employee = QEmployee.employee; // Q클래스 사용
		String confirmResult = null;
		confirmResult = queryFactory.select(employee.confirm)
							        .from(employee)
							        .where(employee.employeeId.eq(employeeId))
							        .fetchOne();
		
		return confirmResult;
	}

}
