package com.source.RESTfulAPI.validation;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validation {
    public static boolean isValidPhoneNumber(String phone){
        Pattern pattern = Pattern.compile("(84|0[3|5|7|8|9])+([0-9]{8})\\b");
        Matcher matcher = pattern.matcher(phone);
        return (matcher.find() && matcher.group().equals(phone));
    }

    public static boolean isValidUsername(String username){
        Pattern pattern = Pattern.compile("^[a-zA-Z]([_-](?![_-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$");
        Matcher matcher = pattern.matcher(username);
        return (matcher.find() && matcher.group().equals(username));
    }


}
