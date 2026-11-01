import "@typespec/http";

using TypeSpec.Http;

@service(#{
  title: "Call Calendar API",
})
@server("http://localhost:3001", "Local development")
namespace CallCalendar;

@route("/api")
namespace Api {
  @summary("Health check")
  @route("/health")
  @get
  op getHealth(): HealthResponse;
}

model HealthResponse {
  status: "ok";
}
