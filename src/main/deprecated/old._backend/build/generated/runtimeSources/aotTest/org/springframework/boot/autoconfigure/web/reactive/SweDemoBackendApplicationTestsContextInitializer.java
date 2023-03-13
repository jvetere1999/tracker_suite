package org.springframework.boot.autoconfigure.web.reactive;

import org.springframework.aot.beans.factory.BeanDefinitionRegistrar;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.boot.web.codec.CodecCustomizer;
import org.springframework.boot.web.embedded.netty.NettyReactiveWebServerFactory;
import org.springframework.http.client.reactive.ReactorResourceFactory;

public final class SweDemoBackendApplicationTestsContextInitializer {
  public static void registerReactiveWebServerFactoryConfiguration_EmbeddedNetty(
      DefaultListableBeanFactory beanFactory) {
    BeanDefinitionRegistrar.of("org.springframework.boot.autoconfigure.web.reactive.ReactiveWebServerFactoryConfiguration$EmbeddedNetty", ReactiveWebServerFactoryConfiguration.EmbeddedNetty.class)
        .instanceSupplier(ReactiveWebServerFactoryConfiguration.EmbeddedNetty::new).register(beanFactory);
  }

  public static void registerEmbeddedNetty_reactorServerResourceFactory(
      DefaultListableBeanFactory beanFactory) {
    BeanDefinitionRegistrar.of("reactorServerResourceFactory", ReactorResourceFactory.class).withFactoryMethod(ReactiveWebServerFactoryConfiguration.EmbeddedNetty.class, "reactorServerResourceFactory")
        .instanceSupplier(() -> beanFactory.getBean(ReactiveWebServerFactoryConfiguration.EmbeddedNetty.class).reactorServerResourceFactory()).register(beanFactory);
  }

  public static void registerEmbeddedNetty_nettyReactiveWebServerFactory(
      DefaultListableBeanFactory beanFactory) {
    BeanDefinitionRegistrar.of("nettyReactiveWebServerFactory", NettyReactiveWebServerFactory.class).withFactoryMethod(ReactiveWebServerFactoryConfiguration.EmbeddedNetty.class, "nettyReactiveWebServerFactory", ReactorResourceFactory.class, ObjectProvider.class, ObjectProvider.class)
        .instanceSupplier((instanceContext) -> instanceContext.create(beanFactory, (attributes) -> beanFactory.getBean(ReactiveWebServerFactoryConfiguration.EmbeddedNetty.class).nettyReactiveWebServerFactory(attributes.get(0), attributes.get(1), attributes.get(2)))).register(beanFactory);
  }

  public static void registerReactiveMultipartAutoConfiguration_defaultPartHttpMessageReaderCustomizer(
      DefaultListableBeanFactory beanFactory) {
    BeanDefinitionRegistrar.of("defaultPartHttpMessageReaderCustomizer", CodecCustomizer.class).withFactoryMethod(ReactiveMultipartAutoConfiguration.class, "defaultPartHttpMessageReaderCustomizer", ReactiveMultipartProperties.class)
        .instanceSupplier((instanceContext) -> instanceContext.create(beanFactory, (attributes) -> beanFactory.getBean(ReactiveMultipartAutoConfiguration.class).defaultPartHttpMessageReaderCustomizer(attributes.get(0)))).register(beanFactory);
  }
}
