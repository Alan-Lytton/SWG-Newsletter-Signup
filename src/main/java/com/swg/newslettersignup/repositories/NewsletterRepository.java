package com.swg.newslettersignup.repositories;

import com.swg.newslettersignup.model.NewsletterItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface NewsletterRepository extends MongoRepository<NewsletterItem,String> {

    List<NewsletterItem> findAll();

    @Query("{id: '?0'}")
    NewsletterItem findNewsletterItemById(String id);
    @Query("{email: '?0'}")
    NewsletterItem findNewsletterItemByEmail(String email);

    public long count();
}
