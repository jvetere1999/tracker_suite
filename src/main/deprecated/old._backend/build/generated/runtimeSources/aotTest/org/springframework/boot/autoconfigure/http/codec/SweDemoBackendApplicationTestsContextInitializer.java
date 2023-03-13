package org.springframework.boot.autoconfigure.http.codec;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.aot.beans.factory.BeanDefinitionRegistrar;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.boot.autoconfigure.codec.CodecProperties;
import org.springframework.boot.web.codec.CodecCustomizer;

public final class SweDemoBackendApplicationTestsContextInitializer {
  public static void registerCodecsAutoConfiguration_DefaultCodecsConfiguration(
      DefaultListableBeanFactory beanFactory) {
    BeanDefinitionRegistrar.of("org.springframework.boot.autoconfigure.http.codec.CodecsAutoConfiguration$DefaultCodecsConfiguration", CodecsAutoConfiguration.DefaultCodecsConfiguration.class)
        .instanceSupplier(CodecsAutoConfiguration.DefaultCodecsConfiguration::new).register(beanFactory);
  }

  public static void registerDefaultCodecsConfiguration_defaultCodecCustomizer(
      DefaultListableBeanFactory beanFactory) {
    BeanDefinitionRegistrar.of("defaultCodecCustomizer", CodecCustomizer.class).withFactoryMethod(CodecsAutoConfiguration.DefaultCodecsConfiguration.class, "defaultCodecCustomizer", CodecProperties.class)
        .instanceSupplier((instanceContext) -> instanceContext.create(beanFactory, (attributes) -> beanFactory.getBean(CodecsAutoConfiguration.DefaultCodecsConfiguration.class).defaultCodecCustomizer(attributes.get(0)))).register(beanFactory);
  }

  public static void registerCodecsAutoConfiguration_JacksonCodecConfiguration(
      DefaultListableBeanFactory beanFactory) {
    BeanDefinitionRegistrar.of("org.springframework.boot.autoconfigure.http.codec.CodecsAutoConfiguration$JacksonCodecConfiguration", CodecsAutoConfiguration.JacksonCodecConfiguration.class)
        .instanceSupplier(CodecsAutoConfiguration.JacksonCodecConfiguration::new).register(beanFactory);
  }

  public static void registerJacksonCodecConfiguration_jacksonCodecCustomizer(
      DefaultListableBeanFactory beanFactory) {
    BeanDefinitionRegistrar.of("jacksonCodecCustomizer", CodecCustomizer.class).withFactoryMethod(CodecsAutoConfiguration.JacksonCodecConfiguration.class, "jacksonCodecCustomizer", ObjectMapper.class)
        .instanceSupplier((instanceContext) -> instanceContext.create(beanFactory, (attributes) -> beanFactory.getBean(CodecsAutoConfiguration.JacksonCodecConfiguration.class).jacksonCodecCustomizer(attributes.get(0)))).register(beanFactory);
  }
}
