package com.shop.api.mapper;

import com.shop.api.dto.category.CategoryResponse;
import com.shop.api.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryResponse toResponse(Category category) {
        return new CategoryResponse(category.getId(), category.getName(), category.getDescription());
    }
}
