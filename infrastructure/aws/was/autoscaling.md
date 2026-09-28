\# WAS Auto Scaling Group



\## 목적



트래픽 증가에 따라 WAS 인스턴스를 자동으로 확장하여

서비스 처리 성능과 안정성을 유지하기 위해 구성



\## 구성



| 항목 | 설정 |

|---|---|

| Minimum Capacity | 1 |

| Desired Capacity | 1 |

| Maximum Capacity | 3 |

| Subnet | 10.0.2.0/24, 10.0.5.0/24 |

| Health Check | EC2 + ELB |

| Load Balancer | Internal ALB |

| Target Group | WAS Target Group |



\## Scaling Policy



Target Tracking Scaling Policy를 사용하였다.



Metric:



`ALBRequestCountPerTarget`



CPU 사용률 대신 실제 요청량을 기준으로 WAS 인스턴스를

확장하도록 구성



\## Scale-out 결과



지속적인 고부하 테스트에서 다음과 같이 확장되는 것을 확인



```text

WAS EC2 1대

&#x20;   ↓

WAS EC2 2대

&#x20;   ↓

WAS EC2 3대

