package com.swg.newslettersignup.services;

import com.swg.newslettersignup.model.NewsletterItem;
import com.swg.newslettersignup.repositories.NewsletterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsletterService {

    @Autowired
    NewsletterRepository newsletterRepo;

    public List<NewsletterItem> findAllSubscribers(){
        return newsletterRepo.findAll();
    }
    public NewsletterItem subscribeToNewsletter(NewsletterItem n){
        return newsletterRepo.save(n);
    }
    public NewsletterItem updateNewsletterInfo(NewsletterItem n){
        NewsletterItem myInfo = newsletterRepo.findNewsletterItemById(n.getId());
        if(myInfo == null){
            return null;
        }
        myInfo.setName(n.getName());
        myInfo.setEmail(n.getEmail());
        myInfo.setContactPreferences(n.getContactPreferences());
        return newsletterRepo.save(myInfo);
    }

    public NewsletterItem findOnePreference(String id){
        Optional<NewsletterItem> optionalNewsletterItem = Optional.ofNullable(newsletterRepo.findNewsletterItemById(id));
        if(optionalNewsletterItem.isPresent()){
            return optionalNewsletterItem.get();
        }
        else{
            return null;
        }

    }

    public NewsletterItem findOnePreferenceByEmail(String email) throws NotFoundException {
        Optional<NewsletterItem> optionalNewsletterItem = Optional.ofNullable(newsletterRepo.findNewsletterItemByEmail(email));
        if(optionalNewsletterItem.isPresent()){
            return optionalNewsletterItem.get();
        }
        else{
            throw new NotFoundException("No newsletter preference found for email: " + email, HttpStatus.NOT_FOUND);
        }

    }

    public String deletePreferences(String id){
        NewsletterItem myInfo = newsletterRepo.findNewsletterItemById(id);
        if (myInfo == null){
            return "No data exists.";
        }else{
            newsletterRepo.delete(myInfo);
            return "Data successfully deleted.";
        }
    }


}
