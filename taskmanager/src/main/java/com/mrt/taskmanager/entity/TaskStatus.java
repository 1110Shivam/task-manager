package com.mrt.taskmanager.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TaskStatus {
    PENDING, IN_PROGRESS, COMPLETED;

    @JsonCreator
    public static TaskStatus from(String value) {
        return TaskStatus.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toValue() {
        return this.name();
    }

}
