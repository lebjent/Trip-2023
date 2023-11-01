package tnew.manager.project.code.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.code.entity.Country;
import tnew.manager.project.code.repository.CountryRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class CodeService {
	
	//국가코드 Repository
	private final CountryRepository countryRepository;
	
	public List<Country> getCountry()throws Exception{
		return countryRepository.findAllByOrderByNameAsc();
	}
	
	
}
