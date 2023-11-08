package tnew.manager.project.locationManage.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.querydsl.jpa.impl.JPAQueryFactory;

import tnew.manager.project.code.entity.Location;
import tnew.manager.project.code.entity.QLocation;
import tnew.manager.project.locationManage.repository.LocationManageCustomRepository;

public class LocationManageCustomRepositoryImpl implements LocationManageCustomRepository {
	
	//동적으로 쿼리를 생성하기 위하여 JPAQueryFactory를 생성
	private JPAQueryFactory queryFactory;
	
	public LocationManageCustomRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}
	
	@Override
	public Page<Location> getLocaitonListPage(Pageable pageable) {
		List<Location> locationList = queryFactory.selectFrom(QLocation.location)
													.offset(pageable.getOffset())
													.limit(pageable.getPageSize())
													.fetch();
		long total = getTotalCount();//총 결과 수			
		return new PageImpl<>(locationList, pageable, total);
	}
	
    private long getTotalCount() {
    	
        return queryFactory
                .selectFrom(QLocation.location)
                .fetch().size();
    }
	
}
