package com.returnofthemac;

public abstract class Base {
    protected String data;
    protected String part;

    public Base(String part) {
        this.data = "";
        this.part = part;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getPart() {
        return part;
    }

    public void setPart(String part) {
        this.part = part;
    }
}
