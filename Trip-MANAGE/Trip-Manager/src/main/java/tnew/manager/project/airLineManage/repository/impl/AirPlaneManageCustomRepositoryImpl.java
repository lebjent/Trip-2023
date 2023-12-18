package tnew.manager.project.airLineManage.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.querydsl.jpa.impl.JPAQueryFactory;

import tnew.manager.project.airLineManage.repository.AirPlaneManageCustomRepository;
import tnew.manager.project.code.entity.AirPlane;
import tnew.manager.project.code.entity.Location;
import tnew.manager.project.code.entity.QAirPlane;
import tnew.manager.project.code.entity.QLocation;
import tnew.manager.project.locationManage.dto.LocationListSearchDTO;

public class AirPlaneManageCustomRepositoryImpl implements AirPlaneManageCustomRepository {
	
	//동적으로 쿼리를 생성하기 위하여 JPAQueryFactory를 생성
	private JPAQueryFactory queryFactory;
	
	public AirPlaneManageCustomRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}
	
	@Override
	public Page<AirPlane> getAirPlaneManageList(Pageable pageable) {
		
		List<AirPlane> airPlaneList = queryFactory.selectFrom(QAirPlane.airPlane)
												  .offset(pageable.getOffset())
												  .limit(pageable.getPageSize())
												  .fetch();
		long total = getTotalCount();//총 결과 수			
		return new PageImpl<>(airPlaneList, pageable, total);
	}
	
	//쿼리의 결과값을 가져오는 함수
    private long getTotalCount() {
    	
        return queryFactory
                .selectFrom(QAirPlane.airPlane)
                .fetch().size();
    }
	
}
