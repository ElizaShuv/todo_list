package ru.sber.service;

import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.sber.entity.Category;
import ru.sber.repository.CategoryRepository;
import ru.sber.security.services.UserDetailsImpl;

import java.util.List;
@Service
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
@Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
    @Override
    public Category updateCategory(Category updatedCategory) {
        Category category = categoryRepository.findById(updatedCategory.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        category.setCategory(updatedCategory.getCategory());
        return categoryRepository.save(category);
    }
    @Override
    public void deleteCategory(long categoryId) {
        categoryRepository.deleteById(categoryId);
    }


    public long getUserIdFromSecurityContext() {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            return ((UserDetailsImpl) principal).getId();
        } else {
            throw new RuntimeException("Пользователь не найден");
        }
    }
    @Override
    public List<Category> findAllCategories() {
        long userId = getUserIdFromSecurityContext();
        return categoryRepository.findAllByUser_Id(userId);
    }

    public Category findById(long categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
    }
}




