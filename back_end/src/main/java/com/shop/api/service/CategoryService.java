package com.shop.api.service;

import com.shop.api.dto.category.CategoryRequest;
import com.shop.api.dto.category.CategoryResponse;
import com.shop.api.entity.Category;
import com.shop.api.exception.BadRequestException;
import com.shop.api.exception.ResourceNotFoundException;
import com.shop.api.mapper.CategoryMapper;
import com.shop.api.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryResponse> findAll() {
        return categoryRepository.findAll().stream().map(categoryMapper::toResponse).toList();
    }

    public CategoryResponse create(CategoryRequest request) {
        categoryRepository.findByNameIgnoreCase(request.name())
                .ifPresent(c -> {
                    throw new BadRequestException("Category name already exists");
                });

        Category category = Category.builder()
                .name(request.name())
                .description(request.description())
                .build();

        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        category.setName(request.name());
        category.setDescription(request.description());
        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found");
        }
        categoryRepository.deleteById(id);
    }

    public Category findEntityById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }
}
