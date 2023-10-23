package tnew.generation.project.review.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import tnew.generation.project.review.dto.ReviewFormDTO;
import tnew.generation.project.review.dto.ReviewSearchDTO;
import tnew.generation.project.review.entity.Review;
import tnew.generation.project.review.service.ReviewService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/trip")
@Tag(name = "여행후기 API",description = "여행후기 관련 서비스")
public class ReviewController {
	
	private final ReviewService reviewService;

	@Operation(summary = "여행리뷰 작성",description = "여행리뷰를 작성하는 서비스")
	@PostMapping(value="/reviewWrite")
	public Map<String,Object> reviewWrite(ReviewFormDTO reviewDto,@RequestParam(value = "images", required = false) List<MultipartFile> reviewFileList)throws Exception{
		
		Map<String,Object> resultObject = new HashMap<>();
		
		Review review = Review.writeReview(reviewDto);
		
		try {
			reviewService.reviewWrite(review,reviewFileList);
			
			resultObject.put("status", "success");
		} catch (Exception e) {
			resultObject.put("status", "fail");
			e.printStackTrace();
		}
		
		return resultObject;
	}
	
	@Operation(summary = "여행리뷰 리스트", description = "여행리뷰 리스트를 불러오는 서비스")
	@GetMapping(value = {"/boardList","/boardList/{page}"})
	public ResponseEntity<?> getReviewList(@PathVariable("page") Optional<Integer> page,ReviewSearchDTO searchParam) {
	    try {
	        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 10);
	        Page<Review> reviewList = reviewService.getReviewList(pageable,searchParam);
	        return ResponseEntity.ok(reviewList);
	    } catch (Exception e) {
	        // 예외를 적절하게 처리하여 의미 있는 에러 응답을 반환
	        return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
	    }
	}
	
}
