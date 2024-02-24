package tnew.manager.project.airLineManage.repository.impl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import tnew.manager.project.airLineManage.dto.AirLinesSearchDTO;
import tnew.manager.project.airLineManage.entity.AirLines;
import tnew.manager.project.airLineManage.entity.QAirLines;
import tnew.manager.project.airLineManage.repository.AirLinesManageCustomRepository;
import tnew.manager.project.airPlaneManage.dto.AirPlaneListSearchDTO;
import tnew.manager.project.airPlaneManage.entity.AirPlane;
import tnew.manager.project.airPlaneManage.entity.QAirPlane;

public class AirLinesManageCustomRepositoryImpl implements AirLinesManageCustomRepository {
	
	//동적으로 쿼리를 생성하기 위하여 JPAQueryFactory를 생성
	private JPAQueryFactory queryFactory;
	
	public AirLinesManageCustomRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}
	
	@Override
	public Page<AirLines> getAirLinesManageList(Pageable pageable, AirLinesSearchDTO searchDTO) {
		List<AirLines> airLinesList = queryFactory.selectFrom(QAirLines.airLines)
				  .where(searchByLike(searchDTO))
				  .offset(pageable.getOffset())
				  .limit(pageable.getPageSize())
				  .fetch();
		
		long total = getTotalCount();//총 결과 수			
		return new PageImpl<>(airLinesList, pageable, total);
	}
	
	//쿼리의 결과값을 가져오는 함수
    private long getTotalCount() {
    	
        return queryFactory
                .selectFrom(QAirLines.airLines)
                .fetch().size();
    }
    
    // 키워드로 검색
    private BooleanExpression searchByLike(AirLinesSearchDTO searchDTO) {
        Optional<String> keyword = Optional.ofNullable(searchDTO.getKeyword());

        if (keyword.isPresent()) {
        	String keywordValue = keyword.get().toUpperCase(); // 키워드를 소문자로 변환
            return QAirLines.airLines.airlineName.like("%" + keyword.get() + "%")
            		.or(QAirLines.airLines.code.like("%" + keywordValue + "%"));
        } else {
            // 키워드가 없는 경우 다른 조건을 추가하거나 null을 반환할 수 있습니다.
            return null;
        }
    }
    
    
}
