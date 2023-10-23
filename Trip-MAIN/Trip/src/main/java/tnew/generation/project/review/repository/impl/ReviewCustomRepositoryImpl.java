package tnew.generation.project.review.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import tnew.generation.project.review.dto.ReviewSearchDTO;
import tnew.generation.project.review.entity.QReview;
import tnew.generation.project.review.entity.Review;
import tnew.generation.project.review.repository.ReviewCustomRepository;

public class ReviewCustomRepositoryImpl implements ReviewCustomRepository {
	
	//동적으로 쿼리를 생성하기 위하여 JPAQueryFactory를 생성
	private JPAQueryFactory queryFactory;
	
	public ReviewCustomRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}
	
	
	//페이지 처리를 시킨 리뷰 리스트 가져오기
	@Override
	public Page<Review> getReviewListPage(Pageable pageable ,ReviewSearchDTO searchParam) {
		
		String[] travelAreaArr = searchParam.getTravelArea().split(",");
		String sortInfo = searchParam.getSortInfo();
		List<Review> reviewList = queryFactory.selectFrom(QReview.review)
													.where(searchByLike(travelAreaArr))
													.orderBy(sortOrderBy(sortInfo))
													.offset(pageable.getOffset())
													.limit(pageable.getPageSize())
													.fetch();
		long total = getTotalCount(travelAreaArr);//총 게시물 결과 수			
		return new PageImpl<>(reviewList, pageable, total);
		
	}
	
	
	/*배열로 받아온 지역을 for문을 돌려 like조건문 생성*/
	private BooleanExpression searchByLike(String[] travelAreaArr) {
	    BooleanExpression likeExpressions = null;
	    if(travelAreaArr.length > 0) {
		    for (String travelArea : travelAreaArr) {
		        BooleanExpression likeExpression = QReview.review.travelArea.like("%" + travelArea + "%");
		        likeExpressions = (likeExpressions != null) ? likeExpressions.or(likeExpression) : likeExpression;
		    }
	    }

	    return likeExpressions;
	}
	
	private OrderSpecifier<?> sortOrderBy(String sortInfo) {
	    if (sortInfo.equals("RTH")) {
	        return QReview.review.regTime.desc();
	    }else if(sortInfo.equals("RTL")) {
	    	return QReview.review.regTime.asc();
	    }else if (sortInfo.equals("RH")) {
	    
	        return QReview.review.rating.desc();
	    } else if (sortInfo.equals("RL")) {
	        return QReview.review.rating.asc();
	    }
	    
	    // 기본 정렬 기준
	    return QReview.review.regTime.desc();
	}
	
    private long getTotalCount(String[] travelAreaArr) {
    	
        return queryFactory
                .selectFrom(QReview.review)
                .where(searchByLike(travelAreaArr))
                .fetch().size();
    }
	
}
