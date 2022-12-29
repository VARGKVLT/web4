package utils;

public class Shot {
    private String x;
    private String y;
    private String r;
    private String hit;
    private String server_time;
    private String exec_time;
    private String code;
    private String msg;

    public Shot(){}


    public String getX() {
        return x;
    }

    public String getY() {
        return y;
    }

    public String getR() {
        return r;
    }

    public String getHit() {
        return hit;
    }

    public String getServer_time() {
        return server_time;
    }

    public String getExec_time() {
        return exec_time;
    }

    public String getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public Shot setX(String x) {
        this.x = x;
        return this;
    }

    public Shot setY(String y) {
        this.y = y;
        return this;
    }

    public Shot setR(String r) {
        this.r = r;
        return this;
    }

    public Shot setHit(String hit) {
        this.hit = hit;
        return this;
    }

    public Shot setServer_time(String server_time) {
        this.server_time = server_time;
        return this;
    }

    public Shot setExec_time(String exec_time) {
        this.exec_time = exec_time;
        return this;
    }

    public Shot setCode(String code) {
        this.code = code;
        return this;
    }

    public Shot setMsg(String msg) {
        this.msg = msg;
        return this;
    }
}
