## Métricas

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| vus | Gauge | Número de usuarios virtuales activos |
| vus_max | Gauge | Número máximo posible de usuarios virtuales (los recursos de VU están preasignados para garantizar que el rendimiento no se vea afectado al escalar el nivel de carga) |
| iterations | Counter | El número total de veces que las VU de la prueba han ejecutado el script JS (la función "default") |
| iteration_duration | Trend | El tiempo que tardó en completar una iteración completa de la función predeterminada / principal |
| dropped_iterations | Counter | Introducido en K6 v0.27.0, el número de iteraciones que no se pudieron iniciar debido a la falta de VU (para los ejecutores de tasa de llegada) o falta de tiempo (debido a maxDuration expirado en los ejecutores basados en iteraciones) |
| data_received | Counter | La cantidad de datos recibidos |
| data_sent | Counter | La cantidad de datos enviados |
| checks | Rate | La tasa de controles exitosos |

## Métricas HTTP

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| http_reqs | Counter | Cuántas solicitudes HTTP ha generado k6 en total |
| http_req_blocked | Trend | Tiempo pasado bloqueado (esperando una ranura de conexión TCP libre) antes de iniciar la solicitud |
| http_req_connecting | Trend | Tiempo empleado en establecer una conexión TCP con el host remoto |
| http_req_tls_handshaking | Trend | Tiempo dedicado a la sesión de protocolo de enlaces TLS con el host remoto |
| http_req_sending | Trend | Tiempo empleado en enviar datos al host remoto |
| http_req_waiting | Trend | Tiempo dedicado a la espera de respuesta del host remoto (a.k.a. "time to first byte" o "TTFB") |
| http_req_receiving | Trend | Tiempo empleado en recibir datos de respuesta del host remoto |
| http_req_duration | Trend | Tiempo total de la solicitud (http_req_sending + http_req_waiting + http_req_receiving) |
| http_req_failed | Rate | La tasa de solicitudes fallidas según setResponseCallback |