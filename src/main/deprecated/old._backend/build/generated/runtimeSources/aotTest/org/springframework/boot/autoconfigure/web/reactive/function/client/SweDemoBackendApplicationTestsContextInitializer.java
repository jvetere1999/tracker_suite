package org.springframework.boot.autoconfigure.web.reactive.function.client;

import org.springframework.aot.beans.factory.BeanDefinitionRegistrar;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.http.client.reactive.ReactorResourceFactory;

public final class SweDemoBackendApplicationTestsContextInitializer {
  public static void registerClientHttpConnectorConfiguration_ReactorNetty(
      DefaultListableBeanFactory beanFactory) {
    BeanDefinitionRegistrar.of("org.springframework.boot.autoconfigure.web.reactive.function.client.ClientHttpConnectorConfiguration$ReactorNetty", ClientHttpConnectorConfiguration.ReactorNetty.class)
        .instanceSupplier(ClientHttpConnectorConfiguration.ReactorNetty::new).register(beanFactory);
  }

  public static void registerReactorNetty_reactorClientHttpConnector(
      DefaultListableBeanFactory beanFactory) {
    BeanDefinitionRegistrar.of("reactorClientHttpConnector", ReactorClientHttpConnector.class).withFactoryMethod(ClientHttpConnectorConfiguration.ReactorNetty.class, "reactorClientHttpConnector", ReactorResourceFactory.class, ObjectProvider.class)
        .instanceSupplier((instanceContext) -> instanceContext.create(beanFactory, (attributes) -> beanFactory.getBean(ClientHttpConnectorConfiguration.ReactorNetty.class).reactorClientHttpConnector(attributes.get(0), attributes.get(1)))).customize((bd) -> bd.setLazyInit(true)).register(beanFactory);
  }

  public static void registerWebClientAutoConfiguration_WebClientCodecsConfiguration(
      DefaultListableBeanFactory beanFactory) {
    BeanDefinitionRegistrar.of("org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConfiguration$WebClientCodecsConfiguration", WebClientAutoConfiguration.WebClientCodecsConfiguration.class)
        .instanceSupplier(WebClientAutoConfiguration.WebClientCodecsConfiguration::new).register(beanFactory);
  }

  public static void registerWebClientCodecsConfiguration_exchangeStrategiesCustomizer(
      DefaultListableBeanFactory beanFactory) {
    BeanDefinitionRegistrar.of("exchangeStrategiesCustomizer", WebClientCodecCustomizer.class).withFactoryMethod(WebClientAutoConfiguration.WebClientCodecsConfiguration.class, "exchangeStrategiesCustomizer", ObjectProvider.class)
        .instanceSupplier((instanceContext) -> instanceContext.create(beanFactory, (attributes) -> beanFactory.getBean(WebClientAutoConfiguration.WebClientCodecsConfiguration.class).exchangeStrategiesCustomizer(attributes.get(0)))).register(beanFactory);
  }
}
