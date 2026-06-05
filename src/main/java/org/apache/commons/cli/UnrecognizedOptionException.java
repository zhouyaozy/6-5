/*
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */

package org.apache.commons.cli;

/**
 * Thrown during parsing signaling an unrecognized option.
 */
public class UnrecognizedOptionException extends ParseException {

    /**
     * This exception {@code serialVersionUID}.
     */
    private static final long serialVersionUID = -252504690284625623L;

    /** The unrecognized option. */
    private final String option;

    /**
     * Constructs a new {@code UnrecognizedArgumentException} with the specified detail message.
     *
     * @param message the detail message.
     */
    public UnrecognizedOptionException(final String message) {
        this(message, null, null);
    }

    /**
     * Constructs a new {@code UnrecognizedArgumentException} with the specified detail message and cause.
     *
     * @param message the detail message.
     * @param cause the cause.
     * @since 1.11.1
     */
    public UnrecognizedOptionException(final String message, final Throwable cause) {
        this(message, null, cause);
    }

    /**
     * Constructs a new {@code UnrecognizedArgumentException} with the specified option and detail message.
     *
     * @param message the detail message.
     * @param option the unrecognized option.
     * @since 1.2
     */
    public UnrecognizedOptionException(final String message, final String option) {
        this(message, option, null);
    }

    /**
     * Constructs a new {@code UnrecognizedArgumentException} with the specified option, detail message and cause.
     *
     * @param message the detail message.
     * @param option the unrecognized option.
     * @param cause the cause.
     * @since 1.11.1
     */
    public UnrecognizedOptionException(final String message, final String option, final Throwable cause) {
        super(message, cause);
        this.option = option;
    }

    /**
     * Constructs a new {@code UnrecognizedArgumentException} with the specified cause.
     *
     * @param cause the cause.
     * @since 1.11.1
     */
    public UnrecognizedOptionException(final Throwable cause) {
        this(cause != null ? cause.getMessage() : null, null, cause);
    }

    /**
     * Gets the unrecognized option.
     *
     * @return the related option.
     * @since 1.2
     */
    public String getOption() {
        return option;
    }
}
