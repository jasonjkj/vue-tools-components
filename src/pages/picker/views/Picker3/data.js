export default data = {
  "status": 200,
  "success": true,
  "message": "ok",
  "data": {
    "type": "record",
    "name": "connection_record_log",
    "namespace": "tsg_galaxy_v3",
    "doc": {
      "primary_key": "common_log_id",
      "partition_key": "common_recv_time",
      "functions": {
        "aggregation": [
          {
            "name": "COUNT",
            "function": "count(expr)"
          },
          {
            "name": "COUNT_DISTINCT",
            "function": "count(distinct expr)"
          },
          {
            "name": "AVG",
            "function": "avg(expr)"
          },
          {
            "name": "SUM",
            "function": "sum(expr)"
          },
          {
            "name": "MAX",
            "function": "max(expr)"
          },
          {
            "name": "MIN",
            "function": "min(expr)"
          }
        ],
        "operator": [
          {
            "name": "=",
            "function": "expr = value"
          },
          {
            "name": "!=",
            "function": "expr != value"
          },
          {
            "name": ">",
            "function": "expr > value"
          },
          {
            "name": "<",
            "function": "expr < value"
          },
          {
            "name": ">=",
            "function": "expr >= value"
          },
          {
            "name": "<=",
            "function": "expr <= value"
          },
          {
            "name": "in",
            "function": "expr in (values)"
          },
          {
            "name": "not in",
            "function": "expr not in (values)"
          },
          {
            "name": "like",
            "function": "expr like value"
          },
          {
            "name": "not like",
            "function": "expr not like value"
          },
          {
            "name": "not empty",
            "function": "notEmpty(expr)"
          },
          {
            "name": "empty",
            "function": "empty(expr)"
          }
        ]
      },
      "schema_query": {
        "dimensions": [
          "common_server_ip",
          "common_client_ip",
          "common_sled_ip",
          "common_server_location",
          "common_subscriber_id",
          "http_domain"
        ],
        "metrics": [
          "common_server_ip",
          "common_client_ip",
          "common_subscriber_id",
          "common_c2s_pkt_num",
          "common_s2c_pkt_num",
          "common_c2s_byte_num",
          "common_s2c_byte_num"
        ],
        "filters": [
          "common_address_type",
          "common_server_ip",
          "common_client_ip",
          "common_server_port",
          "common_server_location",
          "common_subscriber_id",
          "common_c2s_pkt_num",
          "common_s2c_pkt_num",
          "common_c2s_byte_num",
          "common_s2c_byte_num",
          "http_domain",
          "ssl_sni",
          "ssl_pinningst",
          "ssl_intercept_state"
        ],
        "references": {
          "aggregation": [
            {
              "type": "int",
              "functions": "COUNT,COUNT_DISTINCT,AVG,SUM,MAX,MIN"
            },
            {
              "type": "long",
              "functions": "COUNT,COUNT_DISTINCT,AVG,SUM,MAX,MIN"
            },
            {
              "type": "float",
              "functions": "COUNT,COUNT_DISTINCT,AVG,SUM,MAX,MIN"
            },
            {
              "type": "double",
              "functions": "COUNT,COUNT_DISTINCT,AVG,SUM,MAX,MIN"
            },
            {
              "type": "string",
              "functions": "COUNT,COUNT_DISTINCT"
            },
            {
              "type": "date",
              "functions": "COUNT,COUNT_DISTINCT,MAX,MIN"
            },
            {
              "type": "timestamp",
              "functions": "COUNT,COUNT_DISTINCT,MAX,MIN"
            }
          ],
          "operator": [
            {
              "type": "int",
              "functions": "=,!=,>,<,>=,<=,in,not in"
            },
            {
              "type": "long",
              "functions": "=,!=,>,<,>=,<=,in,not in"
            },
            {
              "type": "float",
              "functions": "=,!=,>,<,>=,<="
            },
            {
              "type": "double",
              "functions": "=,!=,>,<,>=,<="
            },
            {
              "type": "string",
              "functions": "=,!=,in,not in,like,not like,not empty,empty"
            },
            {
              "type": "date",
              "functions": "=,!=,>,<,>=,<="
            },
            {
              "type": "timestamp",
              "functions": "=,!=,>,<,>=,<="
            }
          ]
        }
      },
      "schema_type": {
        "BASE": {
          "columns": [
            "common_recv_time",
            "common_log_id",
            "common_policy_id",
            "common_subscriber_id",
            "common_client_ip",
            "common_client_port",
            "common_l4_protocol",
            "common_address_type",
            "common_server_ip",
            "common_server_port",
            "common_action",
            "common_direction",
            "common_entrance_id",
            "common_sled_ip",
            "common_client_location",
            "common_client_asn",
            "common_server_location",
            "common_server_asn",
            "common_c2s_pkt_num",
            "common_s2c_pkt_num",
            "common_c2s_byte_num",
            "common_s2c_byte_num",
            "common_service",
            "common_schema_type",
            "common_user_tags",
            "common_sub_action",
            "common_user_region",
            "common_device_id",
            "common_link_id",
            "common_isp",
            "common_encapsulation",
            "common_app_label",
            "common_app_id",
            "common_protocol_id",
            "common_start_time",
            "common_end_time",
            "common_con_duration_ms",
            "common_stream_dir",
            "common_address_list",
            "common_has_dup_traffic",
            "common_stream_error",
            "common_stream_trace_id"
          ],
          "default_columns": [
            "common_recv_time",
            "common_log_id",
            "common_subscriber_id",
            "common_client_ip",
            "common_server_ip",
            "common_server_port"
          ]
        },
        "HTTP": {
          "columns": [
            "common_recv_time",
            "common_log_id",
            "common_policy_id",
            "common_subscriber_id",
            "common_client_ip",
            "common_client_port",
            "common_l4_protocol",
            "common_address_type",
            "common_server_ip",
            "common_server_port",
            "common_action",
            "common_direction",
            "common_entrance_id",
            "common_sled_ip",
            "common_client_location",
            "common_client_asn",
            "common_server_location",
            "common_server_asn",
            "common_c2s_pkt_num",
            "common_s2c_pkt_num",
            "common_c2s_byte_num",
            "common_s2c_byte_num",
            "common_service",
            "common_schema_type",
            "common_user_tags",
            "common_sub_action",
            "common_user_region",
            "common_device_id",
            "common_link_id",
            "common_isp",
            "common_encapsulation",
            "common_app_label",
            "common_app_id",
            "common_protocol_id",
            "common_start_time",
            "common_end_time",
            "common_con_duration_ms",
            "common_stream_dir",
            "common_address_list",
            "common_has_dup_traffic",
            "common_stream_error",
            "common_stream_trace_id",
            "http_url",
            "http_host",
            "http_domain",
            "http_request_line",
            "http_response_line",
            "http_request_header",
            "http_response_header",
            "http_request_body",
            "http_response_body",
            "http_request_body_key",
            "http_response_body_key",
            "http_proxy_flag",
            "http_sequence",
            "http_snapshot",
            "http_cookie",
            "http_referer",
            "http_user_agent",
            "http_content_length",
            "http_content_type",
            "http_set_cookie",
            "http_version"
          ],
          "default_columns": [
            "common_recv_time",
            "common_log_id",
            "common_subscriber_id",
            "common_client_ip",
            "http_url",
            "common_server_port"
          ]
        },
        "MAIL": {
          "columns": [
            "common_recv_time",
            "common_log_id",
            "common_policy_id",
            "common_subscriber_id",
            "common_client_ip",
            "common_client_port",
            "common_l4_protocol",
            "common_address_type",
            "common_server_ip",
            "common_server_port",
            "common_action",
            "common_direction",
            "common_entrance_id",
            "common_sled_ip",
            "common_client_location",
            "common_client_asn",
            "common_server_location",
            "common_server_asn",
            "common_c2s_pkt_num",
            "common_s2c_pkt_num",
            "common_c2s_byte_num",
            "common_s2c_byte_num",
            "common_service",
            "common_schema_type",
            "common_user_tags",
            "common_sub_action",
            "common_user_region",
            "common_device_id",
            "common_link_id",
            "common_isp",
            "common_encapsulation",
            "common_app_label",
            "common_app_id",
            "common_protocol_id",
            "common_start_time",
            "common_end_time",
            "common_con_duration_ms",
            "common_stream_dir",
            "common_address_list",
            "common_has_dup_traffic",
            "common_stream_error",
            "common_stream_trace_id",
            "mail_protocol_type",
            "mail_account",
            "mail_from_cmd",
            "mail_to_cmd",
            "mail_from",
            "mail_to",
            "mail_cc",
            "mail_bcc",
            "mail_subject",
            "mail_subject_charset",
            "mail_content",
            "mail_content_charset",
            "mail_attachment_name",
            "mail_attachment_name_charset",
            "mail_attachment_content",
            "mail_eml_file",
            "mail_snapshot"
          ],
          "default_columns": [
            "common_recv_time",
            "common_log_id",
            "common_subscriber_id",
            "common_client_ip",
            "mail_from",
            "mail_to",
            "mail_subject"
          ]
        },
        "DNS": {
          "columns": [
            "common_recv_time",
            "common_log_id",
            "common_policy_id",
            "common_subscriber_id",
            "common_client_ip",
            "common_client_port",
            "common_l4_protocol",
            "common_address_type",
            "common_server_ip",
            "common_server_port",
            "common_action",
            "common_direction",
            "common_entrance_id",
            "common_sled_ip",
            "common_client_location",
            "common_client_asn",
            "common_server_location",
            "common_server_asn",
            "common_c2s_pkt_num",
            "common_s2c_pkt_num",
            "common_c2s_byte_num",
            "common_s2c_byte_num",
            "common_service",
            "common_schema_type",
            "common_user_tags",
            "common_sub_action",
            "common_user_region",
            "common_device_id",
            "common_link_id",
            "common_isp",
            "common_encapsulation",
            "common_app_label",
            "common_app_id",
            "common_protocol_id",
            "common_start_time",
            "common_end_time",
            "common_con_duration_ms",
            "common_stream_dir",
            "common_address_list",
            "common_has_dup_traffic",
            "common_stream_error",
            "common_stream_trace_id",
            "dns_message_id",
            "dns_qr",
            "dns_opcode",
            "dns_aa",
            "dns_tc",
            "dns_rd",
            "dns_ra",
            "dns_rcode",
            "dns_qdcount",
            "dns_ancount",
            "dns_nscount",
            "dns_arcount",
            "dns_qname",
            "dns_qtype",
            "dns_qclass",
            "dns_cname",
            "dns_sub",
            "dns_rr"
          ],
          "default_columns": [
            "common_recv_time",
            "common_log_id",
            "common_client_ip",
            "dns_qr",
            "dns_qname",
            "dns_qtype"
          ]
        },
        "SSL": {
          "columns": [
            "common_recv_time",
            "common_log_id",
            "common_policy_id",
            "common_subscriber_id",
            "common_client_ip",
            "common_client_port",
            "common_l4_protocol",
            "common_address_type",
            "common_server_ip",
            "common_server_port",
            "common_action",
            "common_direction",
            "common_entrance_id",
            "common_sled_ip",
            "common_client_location",
            "common_client_asn",
            "common_server_location",
            "common_server_asn",
            "common_c2s_pkt_num",
            "common_s2c_pkt_num",
            "common_c2s_byte_num",
            "common_s2c_byte_num",
            "common_service",
            "common_schema_type",
            "common_user_tags",
            "common_sub_action",
            "common_user_region",
            "common_device_id",
            "common_link_id",
            "common_isp",
            "common_encapsulation",
            "common_app_label",
            "common_app_id",
            "common_protocol_id",
            "common_start_time",
            "common_end_time",
            "common_con_duration_ms",
            "common_stream_dir",
            "common_address_list",
            "common_has_dup_traffic",
            "common_stream_error",
            "common_stream_trace_id",
            "ssl_sni",
            "ssl_san",
            "ssl_cn",
            "ssl_pinningst",
            "ssl_intercept_state",
            "ssl_server_side_latency",
            "ssl_client_side_latency",
            "ssl_server_side_version",
            "ssl_client_side_version",
            "ssl_cert_verify",
            "ssl_error",
            "ssl_con_latency_ms"
          ],
          "default_columns": [
            "common_recv_time",
            "common_log_id",
            "common_subscriber_id",
            "common_client_ip",
            "ssl_sni",
            "common_server_ip",
            "common_server_port"
          ]
        },
        "FTP": {
          "columns": [
            "common_recv_time",
            "common_log_id",
            "common_policy_id",
            "common_subscriber_id",
            "common_client_ip",
            "common_client_port",
            "common_l4_protocol",
            "common_address_type",
            "common_server_ip",
            "common_server_port",
            "common_action",
            "common_direction",
            "common_entrance_id",
            "common_sled_ip",
            "common_client_location",
            "common_client_asn",
            "common_server_location",
            "common_server_asn",
            "common_c2s_pkt_num",
            "common_s2c_pkt_num",
            "common_c2s_byte_num",
            "common_s2c_byte_num",
            "common_service",
            "common_schema_type",
            "common_user_tags",
            "common_sub_action",
            "common_user_region",
            "common_device_id",
            "common_link_id",
            "common_isp",
            "common_encapsulation",
            "common_app_label",
            "common_app_id",
            "common_protocol_id",
            "common_start_time",
            "common_end_time",
            "common_con_duration_ms",
            "common_stream_dir",
            "common_address_list",
            "common_has_dup_traffic",
            "common_stream_error",
            "common_stream_trace_id",
            "ftp_account",
            "ftp_url",
            "ftp_content"
          ],
          "default_columns": [
            "common_recv_time",
            "common_log_id",
            "common_subscriber_id",
            "common_client_ip",
            "ftp_url",
            "common_server_ip",
            "common_server_port"
          ]
        },
        "BGP": {
          "columns": [
            "common_recv_time",
            "common_log_id",
            "common_policy_id",
            "common_subscriber_id",
            "common_client_ip",
            "common_client_port",
            "common_l4_protocol",
            "common_address_type",
            "common_server_ip",
            "common_server_port",
            "common_action",
            "common_direction",
            "common_entrance_id",
            "common_sled_ip",
            "common_client_location",
            "common_client_asn",
            "common_server_location",
            "common_server_asn",
            "common_c2s_pkt_num",
            "common_s2c_pkt_num",
            "common_c2s_byte_num",
            "common_s2c_byte_num",
            "common_service",
            "common_schema_type",
            "common_user_tags",
            "common_sub_action",
            "common_user_region",
            "common_device_id",
            "common_link_id",
            "common_isp",
            "common_encapsulation",
            "common_app_label",
            "common_app_id",
            "common_protocol_id",
            "common_start_time",
            "common_end_time",
            "common_con_duration_ms",
            "common_stream_dir",
            "common_address_list",
            "common_has_dup_traffic",
            "common_stream_error",
            "common_stream_trace_id",
            "bgp_type",
            "bgp_as_num",
            "bgp_route"
          ],
          "default_columns": [
            "common_recv_time",
            "common_log_id",
            "common_subscriber_id",
            "common_client_ip",
            "bgp_type",
            "bgp_as_num",
            "common_server_ip",
            "common_server_port"
          ]
        },
        "VOIP": {
          "columns": [
            "common_recv_time",
            "common_log_id",
            "common_policy_id",
            "common_subscriber_id",
            "common_client_ip",
            "common_client_port",
            "common_l4_protocol",
            "common_address_type",
            "common_server_ip",
            "common_server_port",
            "common_action",
            "common_direction",
            "common_entrance_id",
            "common_sled_ip",
            "common_client_location",
            "common_client_asn",
            "common_server_location",
            "common_server_asn",
            "common_c2s_pkt_num",
            "common_s2c_pkt_num",
            "common_c2s_byte_num",
            "common_s2c_byte_num",
            "common_service",
            "common_schema_type",
            "common_user_tags",
            "common_sub_action",
            "common_user_region",
            "common_device_id",
            "common_link_id",
            "common_isp",
            "common_encapsulation",
            "common_app_label",
            "common_app_id",
            "common_protocol_id",
            "common_start_time",
            "common_end_time",
            "common_con_duration_ms",
            "common_stream_dir",
            "common_address_list",
            "common_has_dup_traffic",
            "common_stream_error",
            "common_stream_trace_id",
            "voip_calling_account",
            "voip_called_account",
            "voip_calling_number",
            "voip_called_number"
          ],
          "default_columns": [
            "common_recv_time",
            "common_log_id",
            "common_subscriber_id",
            "common_client_ip",
            "voip_calling_account",
            "voip_called_account",
            "common_server_ip",
            "common_server_port"
          ]
        }
      },
      "default_columns": [
        "common_recv_time",
        "common_log_id",
        "common_subscriber_id",
        "common_client_ip",
        "common_server_ip",
        "common_server_port",
        "common_schema_type"
      ]
    },
    "fields": [
      {
        "name": "common_recv_time",
        "label": "Receive Time",
        "doc": {
          "allow_query": "true",
          "constraints": {
            "type": "timestamp"
          },
          "format": {
            "functions": "current_timestamp"
          }
        },
        "type": "int"
      },
      {
        "name": "common_log_id",
        "label": "Log ID",
        "doc": {
          "allow_query": "true",
          "format": {
            "functions": "snowflake_id"
          }
        },
        "type": "long"
      },
      {
        "name": "common_policy_id",
        "label": "Policy ID",
        "doc": {
          "visibility": "hidden"
        },
        "type": "int"
      },
      {
        "name": "common_subscriber_id",
        "label": "Subscriber ID",
        "doc": {
          "allow_query": "true"
        },
        "type": "string"
      },
      {
        "name": "common_client_ip",
        "label": "Client IP",
        "doc": {
          "allow_query": "true",
          "constraints": {
            "type": "ip"
          },
          "format": {
            "functions": "geo_ip_detail,geo_asn,radius_match",
            "appendTo": "common_client_location,common_client_asn,common_subscriber_id"
          }
        },
        "type": "string"
      },
      {
        "name": "common_client_port",
        "label": "Client Port",
        "type": "int"
      },
      {
        "name": "common_l4_protocol",
        "label": "L4 Protocol",
        "type": "string"
      },
      {
        "name": "common_address_type",
        "label": "Address Type",
        "doc": {
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "4",
              "value": "ipv4"
            },
            {
              "code": "6",
              "value": "ipv6"
            }
          ]
        },
        "type": "int"
      },
      {
        "name": "common_server_ip",
        "label": "Server IP",
        "doc": {
          "allow_query": "true",
          "constraints": {
            "type": "ip"
          },
          "format": {
            "functions": "geo_ip_country,geo_asn",
            "appendTo": "common_server_location,common_server_asn"
          }
        },
        "type": "string"
      },
      {
        "name": "common_server_port",
        "label": "Server Port",
        "type": "int"
      },
      {
        "name": "common_action",
        "label": "Action",
        "doc": {
          "allow_query": "true",
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "0",
              "value": "None"
            },
            {
              "code": "1",
              "value": "Monitor"
            },
            {
              "code": "2",
              "value": "Intercept"
            },
            {
              "code": "16",
              "value": "Deny"
            },
            {
              "code": "48",
              "value": "Manipulation"
            },
            {
              "code": "128",
              "value": "Allow"
            }
          ]
        },
        "type": "int"
      },
      {
        "name": "common_direction",
        "label": "Direction",
        "doc": {
          "data": [
            {
              "code": "0",
              "value": "outbound"
            },
            {
              "code": "1",
              "value": "inbound"
            }
          ]
        },
        "type": "int"
      },
      {
        "name": "common_entrance_id",
        "label": "Entrance ID",
        "doc": {
          "allow_query": "true"
        },
        "type": "int"
      },
      {
        "name": "common_sled_ip",
        "label": "Sled IP",
        "doc": {
          "allow_query": "true",
          "constraints": {
            "type": "ip"
          }
        },
        "type": "string"
      },
      {
        "name": "common_client_location",
        "label": "Client Location",
        "type": "string"
      },
      {
        "name": "common_client_asn",
        "label": "Client ASN",
        "type": "string"
      },
      {
        "name": "common_server_location",
        "label": "Server Location",
        "type": "string"
      },
      {
        "name": "common_server_asn",
        "label": "Server ASN",
        "type": "string"
      },
      {
        "name": "common_c2s_pkt_num",
        "label": "Packets Sent",
        "type": "int"
      },
      {
        "name": "common_s2c_pkt_num",
        "label": "Packets Received",
        "type": "int"
      },
      {
        "name": "common_c2s_byte_num",
        "label": "Bytes Sent",
        "type": "int"
      },
      {
        "name": "common_s2c_byte_num",
        "label": "Bytes Received",
        "type": "int"
      },
      {
        "name": "common_service",
        "label": "Service",
        "doc": {
          "visibility": "disabled"
        },
        "type": "int"
      },
      {
        "name": "common_schema_type",
        "label": "Schema Type",
        "doc": {
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "BASE",
              "value": "BASE"
            },
            {
              "code": "HTTP",
              "value": "HTTP"
            },
            {
              "code": "MAIL",
              "value": "MAIL"
            },
            {
              "code": "DNS",
              "value": "DNS"
            },
            {
              "code": "SSL",
              "value": "SSL"
            },
            {
              "code": "FTP",
              "value": "FTP"
            },
            {
              "code": "VOIP",
              "value": "VOIP"
            }
          ],
          "allow_query": "true"
        },
        "type": "string"
      },
      {
        "name": "common_user_tags",
        "label": "User Tags",
        "doc": {
          "visibility": "disabled"
        },
        "type": "string"
      },
      {
        "name": "common_sub_action",
        "label": "Sub Action",
        "doc": {
          "visibility": "hidden"
        },
        "type": "string"
      },
      {
        "name": "common_user_region",
        "label": "User Region",
        "doc": {
          "visibility": "hidden"
        },
        "type": "string"
      },
      {
        "name": "common_device_id",
        "label": "Device ID",
        "doc": {
          "visibility": "disabled"
        },
        "type": "string"
      },
      {
        "name": "common_link_id",
        "label": "LINK ID",
        "doc": {
          "visibility": "disabled"
        },
        "type": "int"
      },
      {
        "name": "common_isp",
        "label": "ISP",
        "doc": {
          "visibility": "disabled"
        },
        "type": "string"
      },
      {
        "name": "common_encapsulation",
        "label": "Encapsulation",
        "doc": {
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "0",
              "value": "Ethernet"
            },
            {
              "code": "8",
              "value": "PPP"
            },
            {
              "code": "12",
              "value": "CiscoHDLC"
            }
          ]
        },
        "type": "int"
      },
      {
        "name": "common_app_label",
        "label": "Application Label",
        "doc": {
          "visibility": "disabled"
        },
        "type": "string"
      },
      {
        "name": "common_app_id",
        "label": "Application ID",
        "doc": {
          "visibility": "disabled"
        },
        "type": "int"
      },
      {
        "name": "common_protocol_id",
        "label": "Protocol ID",
        "doc": {
          "visibility": "disabled"
        },
        "type": "int"
      },
      {
        "name": "common_start_time",
        "label": "Start Time",
        "doc": {
          "constraints": {
            "type": "timestamp"
          },
          "visibility": "hidden"
        },
        "type": "int"
      },
      {
        "name": "common_end_time",
        "label": "End Time",
        "doc": {
          "constraints": {
            "type": "timestamp"
          },
          "visibility": "hidden"
        },
        "type": "int"
      },
      {
        "name": "common_con_duration_ms",
        "label": "Duration(ms)",
        "doc": {
          "visibility": "hidden"
        },
        "type": "int"
      },
      {
        "name": "common_stream_dir",
        "label": "Stream Direction",
        "doc": {
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "1",
              "value": "c2s"
            },
            {
              "code": "2",
              "value": "s2c"
            },
            {
              "code": "3",
              "value": "double"
            }
          ]
        },
        "type": "int"
      },
      {
        "name": "common_address_list",
        "label": "Address List",
        "doc": {
          "visibility": "hidden"
        },
        "type": "string"
      },
      {
        "name": "common_has_dup_traffic",
        "label": "Duplication Traffic",
        "doc": {
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "0",
              "value": "No"
            },
            {
              "code": "1",
              "value": "Yes"
            }
          ],
          "visibility": "hidden"
        },
        "type": "int"
      },
      {
        "name": "common_stream_error",
        "label": "Stream Error",
        "doc": {
          "visibility": "hidden"
        },
        "type": "string"
      },
      {
        "name": "common_stream_trace_id",
        "label": "Session ID",
        "doc": {
          "allow_query": "true"
        },
        "type": "long"
      },
      {
        "name": "http_url",
        "label": "URL",
        "type": "string"
      },
      {
        "name": "http_host",
        "label": "Host",
        "doc": {
          "format": {
            "functions": "sub_domain",
            "appendTo": "http_domain"
          }
        },
        "type": "string"
      },
      {
        "name": "http_domain",
        "label": "Domain",
        "type": "string"
      },
      {
        "name": "http_request_line",
        "label": "Request Line",
        "type": "string"
      },
      {
        "name": "http_response_line",
        "label": "Response Line",
        "type": "string"
      },
      {
        "name": "http_request_header",
        "label": "Request Headers",
        "type": "string"
      },
      {
        "name": "http_response_header",
        "label": "Response Headers",
        "type": "string"
      },
      {
        "name": "http_request_body",
        "label": "Request Body",
        "doc": {
          "constraints": {
            "type": "file"
          }
        },
        "type": "string"
      },
      {
        "name": "http_response_body",
        "label": "Response Body",
        "doc": {
          "constraints": {
            "type": "file"
          }
        },
        "type": "string"
      },
      {
        "name": "http_request_body_key",
        "label": "Request Body Key",
        "doc": {
          "visibility": "disabled"
        },
        "type": "string"
      },
      {
        "name": "http_response_body_key",
        "label": "Response Body Key",
        "doc": {
          "visibility": "disabled"
        },
        "type": "string"
      },
      {
        "name": "http_proxy_flag",
        "label": "Proxy Flag",
        "type": "int"
      },
      {
        "name": "http_sequence",
        "label": "Sequence",
        "type": "int"
      },
      {
        "name": "http_snapshot",
        "label": "Http Snapshot",
        "doc": {
          "visibility": "hidden"
        },
        "type": "string"
      },
      {
        "name": "http_cookie",
        "label": "Cookie",
        "type": "string"
      },
      {
        "name": "http_referer",
        "label": "Referer",
        "type": "string"
      },
      {
        "name": "http_user_agent",
        "label": "User Agent",
        "type": "string"
      },
      {
        "name": "http_content_length",
        "label": "Content Length",
        "type": "string"
      },
      {
        "name": "http_content_type",
        "label": "Content Type",
        "type": "string"
      },
      {
        "name": "http_set_cookie",
        "label": "Set Cookie",
        "type": "string"
      },
      {
        "name": "http_version",
        "label": "Version",
        "type": "string"
      },
      {
        "name": "mail_protocol_type",
        "label": "Protocol Type",
        "type": "string"
      },
      {
        "name": "mail_account",
        "label": "Account",
        "type": "string"
      },
      {
        "name": "mail_from_cmd",
        "label": "From CMD",
        "type": "string"
      },
      {
        "name": "mail_to_cmd",
        "label": "To CMD",
        "type": "string"
      },
      {
        "name": "mail_from",
        "label": "From",
        "doc": {
          "constraints": {
            "type": "email"
          }
        },
        "type": "string"
      },
      {
        "name": "mail_to",
        "label": "To",
        "doc": {
          "constraints": {
            "type": "email"
          }
        },
        "type": "string"
      },
      {
        "name": "mail_cc",
        "label": "CC",
        "type": "string"
      },
      {
        "name": "mail_bcc",
        "label": "BCC",
        "type": "string"
      },
      {
        "name": "mail_subject",
        "label": "Subject",
        "doc": {
          "format": {
            "functions": "decode_of_base64",
            "param": "mail_subject_charset"
          }
        },
        "type": "string"
      },
      {
        "name": "mail_subject_charset",
        "label": "Subject Charset",
        "doc": {
          "visibility": "disabled"
        },
        "type": "string"
      },
      {
        "name": "mail_content",
        "label": "Content",
        "doc": {
          "visibility": "hidden"
        },
        "type": "string"
      },
      {
        "name": "mail_content_charset",
        "label": "Content Charset",
        "doc": {
          "visibility": "hidden"
        },
        "type": "string"
      },
      {
        "name": "mail_attachment_name",
        "label": "Attachment",
        "doc": {
          "format": {
            "functions": "decode_of_base64",
            "param": "mail_attachment_name_charset"
          }
        },
        "type": "string"
      },
      {
        "name": "mail_attachment_name_charset",
        "label": "Attachment Charset",
        "doc": {
          "visibility": "hidden"
        },
        "type": "string"
      },
      {
        "name": "mail_attachment_content",
        "label": "Attachment Content",
        "doc": {
          "visibility": "hidden"
        },
        "type": "string"
      },
      {
        "name": "mail_eml_file",
        "label": "EML File",
        "doc": {
          "constraints": {
            "type": "file"
          }
        },
        "type": "string"
      },
      {
        "name": "mail_snapshot",
        "label": "Snapshot",
        "doc": {
          "visibility": "hidden"
        },
        "type": "string"
      },
      {
        "name": "dns_message_id",
        "label": "Message ID",
        "type": "int"
      },
      {
        "name": "dns_qr",
        "label": "QR",
        "doc": {
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "0",
              "value": "QUERY"
            },
            {
              "code": "1",
              "value": "REESPONSE"
            }
          ]
        },
        "type": "int"
      },
      {
        "name": "dns_opcode",
        "label": "OPCODE",
        "doc": {
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "0",
              "value": "QUERY"
            },
            {
              "code": "1",
              "value": "IQUERY"
            },
            {
              "code": "2",
              "value": "STATUS"
            },
            {
              "code": "5",
              "value": "UPDATE"
            }
          ]
        },
        "type": "int"
      },
      {
        "name": "dns_aa",
        "label": "AA",
        "type": "int"
      },
      {
        "name": "dns_tc",
        "label": "TC",
        "type": "int"
      },
      {
        "name": "dns_rd",
        "label": "RD",
        "type": "int"
      },
      {
        "name": "dns_ra",
        "label": "RA",
        "type": "int"
      },
      {
        "name": "dns_rcode",
        "label": "RCODE",
        "type": "int"
      },
      {
        "name": "dns_qdcount",
        "label": "QDCOUNT",
        "type": "int"
      },
      {
        "name": "dns_ancount",
        "label": "ANCOUNT",
        "type": "int"
      },
      {
        "name": "dns_nscount",
        "label": "NSCOUNT",
        "type": "int"
      },
      {
        "name": "dns_arcount",
        "label": "ARCOUNT",
        "type": "int"
      },
      {
        "name": "dns_qname",
        "label": "QNAME",
        "type": "string"
      },
      {
        "name": "dns_qtype",
        "label": "QTYPE",
        "doc": {
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "1",
              "value": "A"
            },
            {
              "code": "2",
              "value": "NS"
            },
            {
              "code": "5",
              "value": "CNAME"
            },
            {
              "code": "6",
              "value": "SOA"
            },
            {
              "code": "11",
              "value": "WKS"
            },
            {
              "code": "12",
              "value": "PTR"
            },
            {
              "code": "13",
              "value": "HINFO"
            },
            {
              "code": "11",
              "value": "WKS"
            },
            {
              "code": "15",
              "value": "MX"
            },
            {
              "code": "28",
              "value": "AAAA"
            }
          ]
        },
        "type": "int"
      },
      {
        "name": "dns_qclass",
        "label": "QCLASS",
        "type": "int"
      },
      {
        "name": "dns_cname",
        "label": "CNAME",
        "type": "string"
      },
      {
        "name": "dns_sub",
        "label": "SUB",
        "doc": {
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "1",
              "value": "DNS"
            },
            {
              "code": "2",
              "value": "DNSSEC"
            }
          ]
        },
        "type": "int"
      },
      {
        "name": "dns_rr",
        "label": "RR",
        "type": "string"
      },
      {
        "name": "ssl_version",
        "label": "Version",
        "type": "string"
      },
      {
        "name": "ssl_sni",
        "label": "SNI",
        "doc": {
          "allow_query": "true",
          "format": {
            "functions": "sub_domain",
            "appendTo": "http_domain"
          }
        },
        "type": "string"
      },
      {
        "name": "ssl_san",
        "label": "SAN",
        "type": "string"
      },
      {
        "name": "ssl_cn",
        "label": "CN",
        "type": "string"
      },
      {
        "name": "ssl_pinningst",
        "label": "Pinning",
        "doc": {
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "0",
              "value": "Not Pinning"
            },
            {
              "code": "1",
              "value": "Pinning"
            },
            {
              "code": "2",
              "value": "Maybe Pinning"
            }
          ]
        },
        "type": "int"
      },
      {
        "name": "ssl_intercept_state",
        "label": "Intercept State",
        "doc": {
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "0",
              "value": "Passthrough"
            },
            {
              "code": "1",
              "value": "Intercept"
            },
            {
              "code": "2",
              "value": "Shutdown"
            }
          ]
        },
        "type": "int"
      },
      {
        "name": "ssl_server_side_latency",
        "label": "Server Side Latency(ms)",
        "type": "int"
      },
      {
        "name": "ssl_client_side_latency",
        "label": "Client Side Latency(ms)",
        "type": "int"
      },
      {
        "name": "ssl_server_side_version",
        "label": "Server Side Version",
        "type": "string"
      },
      {
        "name": "ssl_client_side_version",
        "label": "Client Side Version",
        "type": "string"
      },
      {
        "name": "ssl_cert_verify",
        "label": "Certificate Verify",
        "doc": {
          "constraints": {
            "operator_functions": "=,!="
          },
          "data": [
            {
              "code": "0",
              "value": "No"
            },
            {
              "code": "1",
              "value": "Yes"
            }
          ]
        },
        "type": "int"
      },
      {
        "name": "ssl_error",
        "label": "Error",
        "type": "string"
      },
      {
        "name": "ssl_con_latency_ms",
        "label": "Connection Latency(ms)",
        "doc": {
          "visibility": "disabled"
        },
        "type": "int"
      },
      {
        "name": "ftp_account",
        "label": "Account",
        "type": "string"
      },
      {
        "name": "ftp_url",
        "label": "URL",
        "type": "string"
      },
      {
        "name": "ftp_content",
        "label": "Content",
        "type": "string"
      },
      {
        "name": "bgp_type",
        "label": "Type",
        "type": "int"
      },
      {
        "name": "bgp_as_num",
        "label": "AS Number",
        "type": "string"
      },
      {
        "name": "bgp_route",
        "label": "Route",
        "type": "string"
      },
      {
        "name": "voip_calling_account",
        "label": "Calling Account",
        "type": "string"
      },
      {
        "name": "voip_called_account",
        "label": "Called Account",
        "type": "string"
      },
      {
        "name": "voip_calling_number",
        "label": "Calling Number",
        "type": "string"
      },
      {
        "name": "voip_called_number",
        "label": "Called Number",
        "type": "string"
      },
      {
        "name": "streaming_media_url",
        "label": "Media URL",
        "type": "string"
      },
      {
        "name": "streaming_media_protocol",
        "label": "Media Protocol",
        "type": "string"
      }
    ]
  }
}
