package com.up.skill.model;

import com.up.skill.signup.SignupForm;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Pattern;

/**
 * Created by JPMPC-B213 on 4/18/2017.
 */
@Entity
@Table(name="INFO")
public class VivamusForm {
        private static final String NOT_BLANK_MESSAGE="{notBlank.message}";
        private static final String EMAIL_MESSAGE = "{email.message}";
        private static final String MUST_MOBILE ="{must.mobile}";
        private static final String MUST_CREDIT_CARD="{credit.no}";


    @Id
    @GeneratedValue
    private Long id;
    //name
    @NotBlank (message = "First Name "+ VivamusForm.NOT_BLANK_MESSAGE)
        private String firstName;

    @NotBlank(message =   "Last Name " +VivamusForm.NOT_BLANK_MESSAGE)
    private String lastName;

    @NotBlank(message =  "Email " +VivamusForm.NOT_BLANK_MESSAGE)
    @Email(message = VivamusForm.EMAIL_MESSAGE)
    private String email;

    @NotBlank(message =  "Mobile " +VivamusForm.NOT_BLANK_MESSAGE)
    @Pattern(regexp="(^\\+(?:[0-9]?){6,14}[0-9]$)", message = VivamusForm.MUST_MOBILE)
    private String mobile;



    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}



    //DONATION
    @NotBlank(message =  "Amount " +VivamusForm.NOT_BLANK_MESSAGE)
    private String amount;

    @NotBlank(message =  "Card Holder " +VivamusForm.NOT_BLANK_MESSAGE)
    private String cardHolder;

    @NotBlank(message =  "Credit Card No. " +VivamusForm.NOT_BLANK_MESSAGE)
   /* @Pattern(regexp = "^(?:(?<visa>4[0-9]{12}(?:[0-9]{3})?)|\n" +
            "\t\t(?<mastercard>5[1-5][0-9]{14})|\n" +
            "\t\t(?<discover>6(?:011|5[0-9]{2})[0-9]{12})|\n" +
            "\t\t(?<amex>3[47][0-9]{13})|\n" +
            "\t\t(?<diners>3(?:0[0-5]|[68][0-9])?[0-9]{11})|\n" +
            "\t\t(?<jcb>(?:2131|1800|35[0-9]{3})[0-9]{11}))$", message = VivamusForm.MUST_CREDIT_CARD)*/
    private String creditCardNo;

    @NotBlank(message =  "Security Card No. " +VivamusForm.NOT_BLANK_MESSAGE)
    private String securityCode;

    @NotBlank(message =  "Expiry Date " +VivamusForm.NOT_BLANK_MESSAGE)

    private String expiryDate;


    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCardHolder() {
        return cardHolder;
    }

    public void setCardHolder(String carHolder) {
        this.cardHolder = carHolder;
    }

    public String getCreditCardNo() {
        return creditCardNo;
    }

    public void setCreditCardNo(String creditCardNo) {
        this.creditCardNo = creditCardNo;
    }

    public String getSecurityCode() {
        return securityCode;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }



/*  @Override
    public String toString(){
        return "id="+id+", fname="+fname+", lname="+lname+", email="+email+", mobile="+mobile;
    }*/


}
