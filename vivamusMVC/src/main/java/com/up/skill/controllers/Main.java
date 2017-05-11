package com.up.skill.controllers;

import com.mongodb.util.JSON;
import com.up.skill.model.VivamusForm;
import com.up.skill.model.VivamusRepository;
import org.hsqldb.error.Error;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.PrintWriter;
import java.security.Principal;
import java.util.List;

/**
 * Created by Multi Cabz on 9/21/2016.
 */
@Controller
public class Main {
    @RequestMapping(value = "/main", method = RequestMethod.GET)

    public String indexVivamus(){
        return "main/home";
    }

}




