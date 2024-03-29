package tnew.manager.project.airPlaneManage.repository.impl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import tnew.manager.project.airPlaneManage.dto.AirPlaneListSearchDTO;
import tnew.manager.project.airPlaneManage.entity.AirPlane;
import tnew.manager.project.airPlaneManage.entity.QAirPlane;
import tnew.manager.project.airPlaneManage.repository.AirPlaneManageCustomRepository;

public class AirPlaneManageCustomRepositoryImpl implements AirPlaneManageCustomRepository {
	
	//동적으로 쿼리를 생성하기 위하여 JPAQueryFactory를 생성
	private JPAQueryFactory queryFactory;
	
	public AirPlaneManageCustomRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}
	
	@Override
	public Page<AirPlane> getAirPlaneManageList(Pageable pageable, AirPlaneListSearchDTO searchDTO) {
		
		List<AirPlane> airPlaneList = queryFactory.selectFrom(QAirPlane.airPlane)
												  .where(searchByLike(searchDTO))
												  .orderBy(getSearchOrder(searchDTO))
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
	
    // 키워드로 검색
    private BooleanExpression searchByLike(AirPlaneListSearchDTO searchDTO) {
        Optional<String> keyword = Optional.ofNullable(searchDTO.getKeyword());

        if (keyword.isPresent()) {
        	String keywordValue = keyword.get().toUpperCase(); // 키워드를 소문자로 변환
            return QAirPlane.airPlane.code.like("%" + keyword.get() + "%")
            		.or(QAirPlane.airPlane.flightCode.like("%" + keywordValue + "%"));
        } else {
            // 키워드가 없는 경우 다른 조건을 추가하거나 null을 반환할 수 있습니다.
            return null;
        }
    }
    
    /*정렬조건*/
    private OrderSpecifier<?> getSearchOrder(AirPlaneListSearchDTO searchDTO) {
        Optional<String> sort = Optional.ofNullable(searchDTO.getSort());
        Optional<String> sortContent = Optional.ofNullable(searchDTO.getSortContent());

        if (sort.isPresent() && sortContent.isPresent()) {
            if ("ASC".equals(sort.get())) {
                if ("NAME".equals(sortContent.get())) {
                    return QAirPlane.airPlane.code.asc();
                } else if ("DECODE".equals(sortContent.get())) {
                    return QAirPlane.airPlane.departure.name.asc();
                }else if ("ARCODE".equals(sortContent.get())){
                	return QAirPlane.airPlane.arrive.name.asc();
                }
                // 다른 정렬 조건에 대한 처리 추가
            } else if ("DESC".equals(sort.get())) {
                if ("NAME".equals(sortContent.get())) {
                    return QAirPlane.airPlane.code.desc();
                } else if ("DECODE".equals(sortContent.get())) {
                    return QAirPlane.airPlane.departure.name.desc();
                }else if ("ARCODE".equals(sortContent.get())){
                	return QAirPlane.airPlane.arrive.name.desc();
                }
            }
        }

        // 기본 정렬 조건을 반환 (예: 이름을 기준으로 오름차순)
        return QAirPlane.airPlane.code.asc();
    }
    
}
