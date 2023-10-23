package tnew.generation.project.review.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import tnew.generation.project.review.dto.ReviewSearchDTO;
import tnew.generation.project.review.entity.Review;

public interface ReviewCustomRepository {
	
	//페이징처리된 리뷰 리스트 조회
	Page<Review>  getReviewListPage(Pageable pageable,ReviewSearchDTO searchParam);
	
}
