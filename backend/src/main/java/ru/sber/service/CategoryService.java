package ru.sber.service;

import ru.sber.entity.Category;
import ru.sber.entity.Task;

import java.util.List;

public interface CategoryService {

      Category createCategory(Category category) ;

      Category updateCategory(Category updatedCategory) ;

      void deleteCategory(long categoryId) ;


        long getUserIdFromSecurityContext();

        List<Category> findAllCategories() ;

    Category findById(long categoryId) ;



}


