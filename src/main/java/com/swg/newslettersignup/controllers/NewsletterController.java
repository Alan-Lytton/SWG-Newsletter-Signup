package com.swg.newslettersignup.controllers;

import com.swg.newslettersignup.model.NewsletterItem;
import com.swg.newslettersignup.services.NewsletterService;
import com.swg.newslettersignup.services.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLDecoder;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/newsletter")
public class NewsletterController {

    @Autowired
    NewsletterService newsletterServ;




    @GetMapping
    public List<NewsletterItem> allSubscribed(){
        return newsletterServ.findAllSubscribers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsletterItem> searchOne(@PathVariable("id")String id){
        NewsletterItem foundItem = newsletterServ.findOnePreference(id);
        if(foundItem == null){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(foundItem);
        }
    }

    @GetMapping("/email/{email}")
    public NewsletterItem searchOneByEmail(@PathVariable("email")String email) throws NotFoundException {
        String decodedEmail = null;
        try {
            decodedEmail = URLDecoder.decode(email,"UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        return newsletterServ.findOnePreferenceByEmail(decodedEmail);
    }


    @PostMapping
    public ResponseEntity<NewsletterItem> subscribe(@RequestBody NewsletterItem item)
        throws URISyntaxException {
        NewsletterItem createdItem = newsletterServ.subscribeToNewsletter(item);
        if (createdItem == null) {
            return ResponseEntity.notFound().build();
        } else{
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}").buildAndExpand(createdItem.getId()).toUri();

            return ResponseEntity.created(uri).body(createdItem);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsletterItem> updateSubscriberInfo(@RequestBody NewsletterItem item){
        NewsletterItem updatedItem = newsletterServ.updateNewsletterInfo(item);
        if(updatedItem == null){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(updatedItem);
        }
    }

    @DeleteMapping("/{id}")
    public String deleteSubscription(@PathVariable String id){
        return newsletterServ.deletePreferences(id);

    }

}
