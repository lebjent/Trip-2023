package tnew.manager.project.locationManage.repository.impl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import tnew.manager.project.code.entity.Location;
import tnew.manager.project.code.entity.QLocation;
import tnew.manager.project.locationManage.dto.LocationListSearchDTO;
import tnew.manager.project.locationManage.repository.LocationManageCustomRepository;

public class LocationManageCustomRepositoryImpl implements LocationManageCustomRepository {
	
	//동적으로 쿼리를 생성하기 위하여 JPAQueryFactory를 생성
	private JPAQueryFactory queryFactory;
	
	public LocationManageCustomRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}
	
	@Override
	public Page<Location> getLocaitonListPage(Pageable pageable , LocationListSearchDTO searchDTO) {
		
        
		List<Location> locationList = queryFactory.selectFrom(QLocation.location)
													.offset(pageable.getOffset())
													.limit(pageable.getPageSize())
													.orderBy(getSearchOrder(searchDTO))
													.fetch();
        
        
		long total = getTotalCount();//총 결과 수			
		return new PageImpl<>(locationList, pageable, total);
	}
	
    private long getTotalCount() {
    	
        return queryFactory
                .selectFrom(QLocation.location)
                .fetch().size();
    }
	
    private OrderSpecifier<String> getSearchOrder(LocationListSearchDTO searchDTO) {
        Optional<String> sort = Optional.ofNullable(searchDTO.getSort());
        Optional<String> sortContent = Optional.ofNullable(searchDTO.getSortContent());

        if (sort.isPresent() && sortContent.isPresent()) {
            if ("ASC".equals(sort.get())) {
                if ("NAME".equals(sortContent.get())) {
                    return QLocation.location.name.asc();
                } else if ("ACODE".equals(sortContent.get())) {
                    return QLocation.location.acode.asc();
                }
                // 다른 정렬 조건에 대한 처리 추가
            } else if ("DESC".equals(sort.get())) {
                if ("NAME".equals(sortContent.get())) {
                    return QLocation.location.name.desc();
                } else if ("ACODE".equals(sortContent.get())) {
                    return QLocation.location.acode.desc();
                }
                // 다른 정렬 조건에 대한 처리 추가
            }
        }

        // 기본 정렬 조건을 반환 (예: 이름을 기준으로 오름차순)
        return QLocation.location.name.asc();
    }




    
}
