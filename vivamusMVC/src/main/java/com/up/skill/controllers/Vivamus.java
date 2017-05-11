package com.up.skill.controllers;

import com.up.skill.model.VivamusForm;
import com.up.skill.model.VivamusRepository;
import com.up.skill.support.web.Message;
import com.up.skill.support.web.MessageHelper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.PrintWriter;
import java.security.Security;
import java.util.List;
import java.util.Map;

import static javax.swing.text.html.FormSubmitEvent.MethodType.POST;


/**
 * Created by JPMPC-B213 on 4/17/2017.
 */
@Controller
@Transactional
public class Vivamus {

    @Autowired
    VivamusRepository vivamusRepository;

    @RequestMapping(value = "vivamusForm")

    public String vivamusForm(Model model){
        model.addAttribute(new VivamusForm());
        return "main/index";
    }
    @RequestMapping (value = "/submit", method = RequestMethod.POST)
    public void indexForm(@Valid @ModelAttribute VivamusForm vivamusForm,
                            Errors errors,
                            BindingResult bindingResult,
                            HttpServletRequest request,
                            HttpServletResponse response,
                            RedirectAttributes ra) {

        try {
            PrintWriter out = response.getWriter();

            JSONObject obj = new JSONObject();
            JSONArray fields = new JSONArray();
            JSONArray errMessage = new JSONArray();

            if (!errors.hasErrors()){
                obj.put("message", "success");
                vivamusRepository.save(vivamusForm);
            }else{
                List<FieldError> errs= bindingResult.getFieldErrors();

                for (FieldError error : errs){
                    /*System.out.println(error)*/
                    System.out.println(error.getDefaultMessage());
                    fields.add(error.getField());
                    obj.put("errorFields", fields);
                    obj.put("errorMessages", errMessage);

                    obj.put(error.getField(),error.getDefaultMessage());
                }
            }
            out.print(obj);
        }catch (Exception e){
            e.toString();
        }
    }

    @RequestMapping (value="contributors", method = RequestMethod.GET)
        public String InfoList(Model model){
        model.addAttribute("persons", vivamusRepository.findAll());
        return "main/contributors";
}

    @RequestMapping (value = "/record/{id}")
        public String record(@PathVariable Long id,
                             Model model) {
        model.addAttribute("person", vivamusRepository.findOne(id));
        return "main/edit";
    }

    @RequestMapping (value="/update")
        public String update(@RequestParam  Long id,
                             @RequestParam String firstName,
                             @RequestParam String lastName,
                             @RequestParam String email,
                             @RequestParam String mobile,
                             @RequestParam String amount,
                             @RequestParam String cardHolder,
                             @RequestParam String creditCardNo,
                             @RequestParam String securityCode,
                             @RequestParam String expiryDate,
                             RedirectAttributes ra){
        /*@RequestParam float amount,
                             @RequestParam String cardHolder,
                             @RequestParam String creditCardNo,
                             @RequestParam long securityCode,
                             @RequestParam String expiryDate,*/

     /*   if (errors.hasErrors()) {
            return "redirect:/record/"+id;
        }*/

        VivamusForm vivamusForm = vivamusRepository.findOne(id);

        vivamusForm.setFirstName(firstName);
        vivamusForm.setLastName(lastName);
        vivamusForm.setEmail(email);
        vivamusForm.setMobile(mobile);

        //donation form
        vivamusForm.setAmount(amount);
        vivamusForm.setCardHolder(cardHolder);
        vivamusForm.setCreditCardNo(creditCardNo);
        vivamusForm.setSecurityCode(securityCode);
        vivamusForm.setExpiryDate(expiryDate);

            vivamusRepository.save(vivamusForm);
        MessageHelper.addSuccessAttribute(ra, "form.addNew");
        return ("redirect:/contributors");
}
    @RequestMapping (value="/delete/{id}")
    public String delete(@PathVariable Long id, RedirectAttributes ra) {

        vivamusRepository.delete(id);

        MessageHelper.addSuccessAttribute(ra, "form.delete");
        return ("redirect:/contributors");

    }

}
