# Test Report template

> This template can be used whenever you need to run load tests.

## Env

- Env: <fill_in>
- URL: <fill_in>
- App version: <fill_in>

---

### Hardware

- EC2 Instance types: <fill_in>
- No. of ec2 instances: <fill_in>
- Server version: <fill_in>
- RDS instance: <fill_in>
- Postgres|Mysql version: <fill_in>
- Additional info

## Checklist

- [ ] My test has the relevant auth setup
- [ ] I have defined the relevant `stages` to mimic the load I expect to verify
- [ ] Before running the load tests, I make sure I can actively monitor the mem/cpu usage and other metrics via Appdynamics|Datadog
- [ ] I can view locally in real time the k6 metrics from grafana
- [ ] Once the tests complete, I can capture the report and save it under `results` dir for audit purposes
